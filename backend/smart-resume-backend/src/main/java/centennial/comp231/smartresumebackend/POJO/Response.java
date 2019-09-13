package centennial.comp231.smartresumebackend.POJO;

import com.google.gson.Gson;

public class Response {

    Object object;
    String message;

    public Response() {
        this.object = new Object();
        this.message = "";
    }

    public Response(Object object, String message) {
        this.object = object;
        this.message = message;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Response response = (Response) o;

        if (object != null ? !object.equals(response.object) : response.object != null) return false;
        return message != null ? message.equals(response.message) : response.message == null;
    }

    @Override
    public int hashCode() {
        int result = object != null ? object.hashCode() : 0;
        result = 31 * result + (message != null ? message.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
