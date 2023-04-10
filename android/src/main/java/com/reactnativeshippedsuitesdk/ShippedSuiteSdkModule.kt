package com.reactnativeshippedsuitesdk

import com.facebook.react.bridge.*
import com.invisiblecommerce.shippedsuite.Mode
import com.invisiblecommerce.shippedsuite.ShippedSuite
import com.invisiblecommerce.shippedsuite.exception.ShippedException
import com.invisiblecommerce.shippedsuite.model.ShippedOffers
import com.invisiblecommerce.shippedsuite.ui.LearnMoreDialog
import com.invisiblecommerce.shippedsuite.ui.ShippedSuiteConfiguration
import com.invisiblecommerce.shippedsuite.ui.ShippedSuiteType
import java.math.BigDecimal


class ShippedSuiteSdkModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "ShippedSuiteSdk"
  }

  private val shippedSuite by lazy { ShippedSuite() }

  @ReactMethod
  fun configure(configuration: ReadableMap) {
    val publicKey = configuration.getString("publicKey")
    val mode = configuration.getString("mode")

    if (publicKey != null) {
      ShippedSuite.configurePublicKey(
        reactApplicationContext.applicationContext,
        publicKey
      )
    }

    if (mode == "production") {
      ShippedSuite.setMode(Mode.PRODUCTION)
    } else {
      ShippedSuite.setMode(Mode.DEVELOPMENT)
    }
  }

  @ReactMethod
  fun displayLearnMoreModal(configuration: ReadableMap) {
    currentActivity?.let {
      val config = ShippedSuiteConfiguration()
      if (configuration.hasKey("type")) {
        val type = configuration.getInt("type")
        if (type != null) {
          when (type) {
            0 -> config.type = ShippedSuiteType.SHIELD
            1 -> config.type = ShippedSuiteType.GREEN
            2 -> config.type = ShippedSuiteType.GREEN_AND_SHIELD
          }
        }
      }

      if (configuration.hasKey("isInformational")) {
        val isInformational = configuration.getBoolean("isInformational")
        if (isInformational != null) {
          config.isInformational = isInformational
        }
      }

      if (configuration.hasKey("isMandatory")) {
        val isMandatory = configuration.getBoolean("isMandatory")
        if (isMandatory != null) {
          config.isMandatory = isMandatory
        }
      }

      if (configuration.hasKey("isRespectServer")) {
        val isRespectServer = configuration.getBoolean("isRespectServer")
        if (isRespectServer != null) {
          config.isRespectServer = isRespectServer
        }
      }

      if (configuration.hasKey("currency")) {
        val currency = configuration.getString("currency")
        if (currency != null) {
          config.currency = currency
        }
      }

      LearnMoreDialog.show(it, config)
    }
  }

  @ReactMethod
  fun getOffersFee(amount: String, currency: String? = null, promise: Promise) {
    val orderValue = BigDecimal.valueOf(amount.trim().toString().toDouble())
    shippedSuite.getOffersFee(
      orderValue,
      currency,
      object : ShippedSuite.Listener<ShippedOffers> {
        override fun onSuccess(response: ShippedOffers) {
          val map = Arguments.createMap()
          map.putString("storefrontId", response.storefrontId)
          map.putString("orderValue", response.orderValue.toString())
          map.putString("shieldFee", response.shieldFee?.toString())
          map.putString("greenFee", response.greenFee?.toString())
          map.putString("offeredAt", response.offeredAt.toString())
          promise.resolve(map)
        }

        override fun onFailed(exception: ShippedException) {
          promise.reject(exception.message)
        }
      }
    )
  }

}
