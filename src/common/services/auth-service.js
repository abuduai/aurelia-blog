
export class AuthService {
  constructor() {
    this.delay = 100;
    this.currentUser = null;
    this.users = ["Nick Shallee", "Jane Doe", "Abu"];
  }

  login(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.users.includes(name)) {
          this.currentUser = name;
          resolve({ user: name });
        } else {
          reject(new Error("Invalid credentials."));
        }
      }, this.delay);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.currentUser = null;
        if (this.currentUser) {
          reject(new Error("Error logging out."));
        } else {
          resolve({ success: true });
        }
      }, this.delay);
    });
  }

  /* signup(email, pass) {
    this.firebase.auth().createUserWithEmailAndPassword(email, pass).then(user => {
		console.log('current user---', user);
	}).catch(error => {
		console.log('error....', error.message);
	})
  } */
}
