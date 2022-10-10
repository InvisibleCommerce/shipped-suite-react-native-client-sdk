package com.reactnativeshippedsuitesdk

import com.facebook.react.bridge.*
import com.invisiblecommerce.shippedsuite.Mode
import com.invisiblecommerce.shippedsuite.ShippedSuite
import com.invisiblecommerce.shippedsuite.exception.ShippedException
import com.invisiblecommerce.shippedsuite.model.ShippedOffers
import com.invisiblecommerce.shippedsuite.ui.LearnMoreDialog
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
  fun displayLearnMoreModal(type: String) {
    currentActivity?.let { LearnMoreDialog.show(it, ShippedSuiteType.valueOf(type.uppercase())) }
  }

  @ReactMethod
  fun getOffersFee(amount: String, promise: Promise) {
    val orderValue = BigDecimal.valueOf(amount.trim().toString().toDouble())
    shippedSuite.getOffersFee(
      orderValue,
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
