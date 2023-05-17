/**
 * @format
 */

import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {
  ShippedSuiteAppearance,
  ShippedSuiteType,
  WidgetView,
} from '../WidgetView';

it('renders a WidgetView using Snapshots', () => {
  const component = renderer.create(
    <WidgetView
      configuration={{
        type: ShippedSuiteType.GreenAndShield,
        isInformational: true,
        isMandatory: true,
        isRespectServer: true,
        currency: 'USD',
        appearance: ShippedSuiteAppearance.Auto,
      }}
      onChange={() => {}}
    />
  );
  expect(component).toMatchSnapshot();
});
