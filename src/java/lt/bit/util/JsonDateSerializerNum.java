
package lt.bit.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.json.bind.adapter.JsonbAdapter;

//cia pavizdinis methodas kad vietoj datos gauti tik skaiciuka 
public class JsonDateSerializerNum implements JsonbAdapter<Date, Number> {

    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public Number adaptToJson(Date date) throws Exception {
        if (date == null) {
            return Long.MIN_VALUE;
        }
        return date.getTime();
    }

    @Override
    public Date adaptFromJson(Number dateTime) throws Exception {
        if (dateTime != null) {
            return new Date(dateTime.longValue());
        } else {
            return null;
        }
    }
}
