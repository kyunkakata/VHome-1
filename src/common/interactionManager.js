/**
* Created by nghinv on Tue Oct 16 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { InteractionManager } from "react-native";

export default {
  ...InteractionManager,
  runAfterInteractions: f => {
    // ensure f get called, timeout at 500ms
    let called = false;
    const timeout = setTimeout(() => { called = true; f() }, 300);
    InteractionManager.runAfterInteractions(() => {
      if (called) return;
      clearTimeout(timeout);
      f();
    });
  }
};
