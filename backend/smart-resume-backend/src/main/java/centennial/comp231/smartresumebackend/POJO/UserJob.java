package centennial.comp231.smartresumebackend.POJO;

import com.google.gson.Gson;

public class UserJob {
    private String email;
    private String jobId;


    public UserJob(String email, String jobId) {
        this.email = email;
        this.jobId = jobId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserJob userJob = (UserJob) o;

        if (email != null ? !email.equals(userJob.email) : userJob.email != null) return false;
        return jobId != null ? jobId.equals(userJob.jobId) : userJob.jobId == null;
    }

    @Override
    public int hashCode() {
        int result = email != null ? email.hashCode() : 0;
        result = 31 * result + (jobId != null ? jobId.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
