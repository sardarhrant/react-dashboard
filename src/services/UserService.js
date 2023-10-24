class UserService {
    static BASE_URL = 'http://localhost:8080';

    static fetchUsers = async () => {
        const data = await fetch(`${this.BASE_URL}/users`);
        return data.json();
    }

    static fetchReports = async () => {
        const data = await fetch(`${this.BASE_URL}/reports`);
        return data.json();
    }

    static fetchUserById = async (id) => {
        const data = await fetch(`${this.BASE_URL}/users/${id}`);
        return data.json();
    }

    static fetchUserReportById = async (userId) => {
        const data = await fetch(`${this.BASE_URL}/reports?userId=${userId}`);
        return data.json();
    }

    // #TODO
    static fetchUserWithReports = async (userId) => {
        const data = await Promise.all([UserService.fetchUserById(userId), UserService.fetchUserReportById(userId)]);
        return await Promise.all(data.map(res => res.json()));
    }
}

export default UserService;