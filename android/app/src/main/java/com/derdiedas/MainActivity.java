package com.derdiedas;

import com.facebook.react.ReactActivity;

// Adding a SplashScreen https://github.com/crazycodeboy/react-native-splash-screen
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

// https://github.com/crazycodeboy/react-native-splash-screen#third-stepplugin-configuration
/* TODO iOS
 */
@Override
  protected void onCreate(Bundle savedInstanceState) {
   SplashScreen.show(this); 
   super.onCreate(savedInstanceState); 
 }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "DerDieDas";
  }
}
