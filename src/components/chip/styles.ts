import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  iconContainer: {
    width: 66,
    height: 66
  },
  textContainer: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16
  },
  title: {
    fontFamily: 'ExtraBold',
    lineHeight: 21,
    fontSize: 16,
    color: '#fff'
  },
  content: {
    fontSize: 13,
    lineHeight: 18,
    color: '#71717A',
    fontFamily: 'Regular'
  },
  wrapper: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  processing: {
    padding: 16
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  icon: {
    width: 32,
    height: 32
  },
  indicator: {
    width: 38,
    height: 38
  }
});
