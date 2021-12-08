import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock("react-native-paper", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View, Pressable } = require("react-native");
  const actual = jest.requireActual("react-native-paper")

  const list = View;
  list.Item = View;
  list.Icon = View;

  const button = Pressable;
  button.title = 'Pressable';
  const appBar = actual.Appbar;
  appBar.Action = button;

  const bottomNav = View;
  bottomNav.SceneMap = () => {
    return View;
  };

  return {
    ...actual,
    List: list,
    Appbar: appBar,
    BottomNavigation: bottomNav
  };
});