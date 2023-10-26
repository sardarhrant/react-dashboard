class ReportService {
    static API_ENDPOINT = 'http://localhost:8080/reports';

    static fetchReports = async () => {
        const data = await fetch(`${this.API_ENDPOINT}`);
        return data.json();
    }

    static addReport = async (newReport) => {
        const data = await fetch(this.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReport),
        });

        return data.json();
    }

    static deleteReport = async (id) => {
        const response = await fetch(`${this.API_ENDPOINT}/${id}`, {
            method: 'DELETE'
        });

        if (response.statusText === 'OK') {
            return id
        } else {
            throw new Error('Report does not exists');
        }

    }

    static updateReport = async (id, newReport) => {
        const data = await fetch(`${this.API_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReport),
        });

        return data.json();
    }
}

export default ReportService;