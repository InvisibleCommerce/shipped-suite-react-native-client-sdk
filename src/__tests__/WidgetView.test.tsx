/**
 * @format
 */

 import 'react-native'
 import React from 'react'
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer'
 import { ShippedSuiteType, WidgetView } from '../WidgetView'
 
 it('renders a WidgetView using Snapshots', () => {
     const component = renderer.create(
        <WidgetView
        type={ShippedSuiteType.GreenAndShield}
        isRespectServer={true}
        onChange={() => {}}
      />
     )
     expect(component).toMatchSnapshot()
 })
  