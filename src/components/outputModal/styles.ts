import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  linear: {
    flex: 1,
    paddingHorizontal: 24
  },
  safeArea: {
    flex: 1
  },
  modalContent: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    elevation: 5
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  closeText: {
    fontSize: 20,
    fontFamily: 'Bold',
    color: '#fff'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  },
  headerTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'ExtraBold',
    color: '#FAFAFA'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 24
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  promptContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#27272A'
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  prompt: {
    fontFamily: 'Bold',
    fontSize: 15,
    lineHeight: 20,
    color: '#FAFAFA'
  },
  copy: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Regular',
    color: '#A1A1AA'
  },
  entry: {
    fontSize: 16,
    fontFamily: 'Regular',
    lineHeight: 21,
    color: '#FAFAFA',
    marginTop: 12
  },
  styleContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FAFAFA1A',
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginTop: 12
  },
  style: {
    fontSize: 12,
    fontFamily: 'Regular',
    lineHeight: 16,
    color: '#FAFAFA'
  }
});
