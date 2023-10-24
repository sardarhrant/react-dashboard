class ReportService {
    static API_ENDPOINT = 'http://localhost:8080/reports';

    static addReport = async (newReport) => {
        const data = await fetch(this.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReport),
        });

        return data;
    }

    static deleteReport = async (id) => {
        const data = await fetch(`${this.API_ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return data;
    }

    static updateReport = async (id, newReport) => {
        const data = await fetch(`${this.API_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReport),
        });

        return data;
    }
}

export default ReportService;