package com.reactnativeshippedsuitesdk

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.invisiblecommerce.shippedsuite.ui.ShippedSuiteType
import java.math.BigDecimal

class RNWidgetViewManager : SimpleViewManager<RNWidgetView>() {
  override fun getName(): String {
    return "RNWidgetView"
  }

  @ReactProp(name = "type")
  fun setType(view: RNWidgetView, type: Int) {
    when (type) {
      0 -> view.setType(ShippedSuiteType.SHIELD)
      1 -> view.setType(ShippedSuiteType.GREEN)
      2 -> view.setType(ShippedSuiteType.GREEN_AND_SHIELD)
    }
  }

  @ReactProp(name = "isRespectServer")
  fun setIsRespectServer(view: RNWidgetView, isRespectServer: Boolean) {
    view.setIsRespectServer(isRespectServer)
  }

  override fun receiveCommand(view: RNWidgetView, commandId: String?, args: ReadableArray?) {
    val size = args?.size()
    if (size != null) {
      if (size > 0) {
        if (args.getType(0) == ReadableType.String) {
          val amount = args.getString(0)
          when (commandId) {
            "updateOrderValue" -> view.updateOrderValue(
              BigDecimal.valueOf(
                amount.trim().toString().toDouble()
              )
            )
          }
        }
      }
    }
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
    return MapBuilder.of(
      "onChange", MapBuilder.of("registrationName", "onChange")
    )
  }

  override fun createViewInstance(reactContext: ThemedReactContext): RNWidgetView {
    return RNWidgetView(reactContext)
  }
}
