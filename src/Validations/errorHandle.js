export const errorValidate = (data) => {
    if (data.error) {
      let message = data.error.details[0].message;
      let key = data.error.details[0].context.key;
      return { [key]: message };
    } else {
      return true;
    }
  };
  