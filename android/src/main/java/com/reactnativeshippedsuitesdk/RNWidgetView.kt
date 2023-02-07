package com.reactnativeshippedsuitesdk

import android.util.Log
import android.view.Choreographer
import android.view.View
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.events.EventDispatcher
import com.invisiblecommerce.shippedsuite.ui.ShippedSuiteType
import com.invisiblecommerce.shippedsuite.ui.WidgetView
import kotlinx.coroutines.NonCancellable.isActive
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

  fun setType(type: ShippedSuiteType) {
    widgetView.type = type
  }

  fun setIsMandatory(isMandatory: Boolean) {
    widgetView.isMandatory = isMandatory
  }

  fun setIsRespectServer(isRespectServer: Boolean) {
    widgetView.isRespectServer = isRespectServer
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
