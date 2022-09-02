/* import * as Facebook from "expo-facebook";

export default async function loginWithFacebook() {
  try {
    await Facebook.initializeAsync("337851891519808");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      console.log("Fs", token);
    }
  } catch (error) {
    console.log("Error logging in with facebook", error);
  }
}
 */
