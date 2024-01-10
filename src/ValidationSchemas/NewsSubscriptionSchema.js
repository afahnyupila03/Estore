import * as Yup from "yup";

export const isEmailTaken = async (email) => {
  // LOGIC TO CHECK EXISTING EMAILS.
  const existingEmail = [
    "john@example.com",
    "mary@example.com",
    "jane@example.com",
  ];
  return existingEmail.includes(email);
};

export const NewsSubscriptionSchema = Yup.object().shape({
  emailSubscription: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .test("email-is-taken", "Email already exist!", async (value) => {
      // CHECK FOR IS EMAIL ALREADY EXIST
      const isTaken = await isEmailTaken(value);
      // RETURN THE OPPOSITE RESULT IF EMAIL DOESN'T EXIST.
      return !isTaken;
    })
    .required("* Email is required")
});
