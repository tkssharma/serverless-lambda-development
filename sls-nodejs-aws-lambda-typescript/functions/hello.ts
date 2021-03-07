import axios from 'axios';

export const handle: any = async (event: any) => {
    console.log(event);
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response.data);
}
