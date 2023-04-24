package com.reactnativeshippedsuitesdk

import android.widget.FrameLayout
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.events.EventDispatcher
import com.invisiblecommerce.shippedsuite.ui.ShippedSuiteConfiguration
import com.invisiblecommerce.shippedsuite.ui.ShippedSuiteType
import com.invisiblecommerce.shippedsuite.ui.WidgetView
import java.math.BigDecimal


class RNWidgetView(context: ThemedReactContext) : FrameLayout(context) {
  private lateinit var widgetView: WidgetView

  private var mEventDispatcher: EventDispatcher? = context.getNativeModule(UIManagerModule::class.java)?.eventDispatcher

  init {
    widgetView = WidgetView(context)
    widgetView.callback = object : WidgetView.Callback<BigDecimal> {
      override fun onResult(result: Map<String, Any>) {
        mEventDispatcher?.dispatchEvent(WidgetChangedEvent(id, result))
      }
    }
    addView(widgetView)

    viewTreeObserver.addOnGlobalLayoutListener { requestLayout() }
  }

  fun setConfiguration(configuration: ReadableMap) {
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
    widgetView.configuration = config
  }

  fun updateOrderValue(amount: BigDecimal) {
    widgetView.updateOrderValue(amount)
  }

  override fun requestLayout() {
    super.requestLayout()
    post(mLayoutRunnable)
  }

  private val mLayoutRunnable = Runnable {
    measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY))
    layout(left, top, right, bottom)
  }
}
