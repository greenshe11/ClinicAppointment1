export async function resetSymptomsSelected() {
    try {
        const response = await fetch('/api/session/storeSymptomsSelected', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"symptoms": [], "code": []}),
        });
  
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
      
  
    } catch (error) {
  
    }
  }


 
export const getUserData = async () => {
    const content = await fetch('/api/patient?for=session')
    const resJson = await content.json()
    return resJson
}