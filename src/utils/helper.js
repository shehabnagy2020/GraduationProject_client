export const convertToFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if (key === "files") {
        for (let i = 0; i < element.length; i++) {
          const file = element[i];
          formData.append(key, file);
        }
      } else formData.append(`${key}`, element);
    }
  }
  return formData;
};
