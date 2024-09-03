const fetchCourses = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/courses");
    const data = await response.json();

    if (Array.isArray(data)) {
      const courseList = document.getElementById("course-list");
      data.forEach((course) => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = course.image; // Asegúrate de que la propiedad 'image' exista en los datos del curso
        img.alt = course.title;

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = course.title;

        card.appendChild(img);
        card.appendChild(title);
        courseList.appendChild(card);
      });
    } else {
      console.error("Error: La respuesta de la API no es un array.");
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

fetchCourses();
