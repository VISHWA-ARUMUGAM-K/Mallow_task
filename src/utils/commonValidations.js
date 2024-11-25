const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email) {
  if (!emailPattern.test(email)) {
    return "Email must be in correct format";
  }
  return true;
}

const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

export function validateName(name) {
  if (!namePattern.test(name)) {
    return "Name should not containe any numbers or special characters";
  }
}

const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export function validateURL(url) {
  if (!urlPattern.test(url)) {
    return "Link is invalid";
  }
  return true;
}
