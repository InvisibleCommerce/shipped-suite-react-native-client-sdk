package com.reactnativeshippedsuitesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter

internal class WidgetChangedEvent constructor(
  viewTag: Int,
  private val details: Map<String, Any?>
) : Event<WidgetChangedEvent>(viewTag) {
  override fun getEventName(): String {
    return EVENT_NAME
  }

  override fun dispatch(rctEventEmitter: RCTEventEmitter) {
    rctEventEmitter.receiveEvent(viewTag, eventName, serializeEventData())
  }

  private fun serializeEventData(): WritableMap {
    val eventData = Arguments.createMap()
    eventData.putBoolean("isSelected", details["isSelected"] as Boolean)
    eventData.putString("shieldFee", details["shieldFee"]?.toString())
    eventData.putString("greenFee", details["greenFee"]?.toString())
    eventData.putString("error", details["error"]?.toString())
    return eventData
  }

  companion object {
    const val EVENT_NAME = "onChange"
  }
}
