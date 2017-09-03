// Common activity levels.
export const TDEE_ACTIVITY = {'': '', "1.2" : "Sedentary (Office Job)", "1.375": "Light Exercise (1-2 Days/Wk)", "1.55": "Moderate Excercise (3-5 Days/wk)", "1.725": "Heavy Excercise (6-7 Days/wk)", "1.9": "Athlete (2x/day)"};
// Gender specific modifiers for calculating BMI.
export const BMR_GENDER_MODIFIERS = {
                                      female: { b: 655, w: 9.6, h: 1.8, a: 4.7},
                                      male: { b: 66, w: 13.7, h: 5, a: 6.8 }
                                     };
// Available genders.
export const TDEE_GENDERS = { '': '', female: 'Female', male: 'Male' };
export class TdeeCalc {

  /**
   * Get the tdee
   * @return double
   */
  getTDEE = (gender, height, weight, age, activity) => {

     return activity * this.getBMR(gender, height, weight, age);

  }

  /**
   * Get the basal metabolic rate.
   * @return double
   */
  getBMR = (gender, height, weight, age) => {

    // Convert to metric.
    const kg = parseInt(weight) / 2.20;
    const cm = parseInt(height) * 2.54

    // Calculate TDEE.
    return BMR_GENDER_MODIFIERS[gender].b + (BMR_GENDER_MODIFIERS[gender].w * kg) + (BMR_GENDER_MODIFIERS[gender].h * cm) - (BMR_GENDER_MODIFIERS[gender].a * age);

  }

}
