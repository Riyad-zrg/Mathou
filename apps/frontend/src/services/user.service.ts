async function getUserById(id:number){
    const url = `http://localhost:4000/users/${id}`;
    try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error:any) {
    console.error(error.message);
  }
}