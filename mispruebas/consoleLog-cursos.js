const fetchCourses = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/courses"); // Reemplaza 'URL_DE_LA_API' con la URL real de la API
    const data = await response.json();

    if (Array.isArray(data)) {
      data.forEach((course) => {
        console.log(course.title);
      });
    } else {
      console.error("Error: La respuesta de la API no es un array.");
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

fetchCourses();
