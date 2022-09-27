import PropTypes from 'prop-types';
import { Platform } from 'react-native';

const androidPropTypes = {};

const iOSPropTypes = {};

export default {
  ...(Platform.OS === 'android' ? androidPropTypes : iOSPropTypes),
  type: PropTypes.string,
  isRespectServer: PropTypes.bool,
  onChange: PropTypes.func,
};
