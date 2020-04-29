package lt.bit.rest;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.scene.media.Media;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import lt.bit.data.DB;
import lt.bit.data.Person;

/**
 *
 * @author Lina
 */
@Path("person")
public class PersonREST {

    @Context
    private HttpServletRequest request;

    @GET
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    public List<Person> list() {
        EntityManager em = (EntityManager) request.getAttribute("em");
        List<Person> list = DB.getPersons(em);

        return list;

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Path("{id}")
    public Person getPerson(@PathParam("id") Integer id) {
        EntityManager em = (EntityManager) request.getAttribute("em");
        Person person = DB.getPerson(em, id);
        return person;
    }

    @DELETE
    @Path("{id}")
    public void deletePerson(@PathParam("id") Integer id) { 
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.removePerson(em, id);

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Consumes(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    public Person createPerson(Person p) { 
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.addPerson(em, p);
        return p;      
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Consumes(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Path("{id}")
    public Person updatePerson(@PathParam("id") Integer id, Person p) { 
        p.setId(id);
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.updatePerson(em, p);
        return p;  
    }
}
