
package lt.bit.rest;

import java.util.List;
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
import lt.bit.data.Address;
import lt.bit.data.Contact;
import lt.bit.data.DB;

/**
 *
 * @author Lina
 */
@Path("person/{id}/contact")
public class ContactREST {
@Context
    private HttpServletRequest request;    
    @GET
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    
    public List<Contact> list(@PathParam("id") Integer id) {
        EntityManager em = (EntityManager) request.getAttribute("em");
       
        List<Contact> list = DB.getContacts(em, id);
       
        return list;
    } 
    
    @GET
    @Path("{contactId}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")    
    public Contact getContact(@PathParam("contactId") Integer id, @PathParam("id") Integer personId) {
        EntityManager em = (EntityManager) request.getAttribute("em");
     
        Contact contact = DB.getContact(em, id);
        
        if (contact.getPerson().getId() + 0 == personId + 0) {
            return contact;
        } else {
            return null;
        }
    }

   @DELETE
    @Path("{contactId}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    public void deleteContact(@PathParam("contactId") Integer id, @PathParam("id") Integer personId) { //ocia jau anotuojam paduota parametra
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.removeContact(em, id);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Consumes(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    public Contact createContact(Contact c, @PathParam("id") Integer idP) { 
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.addContact(em, idP, c);
        return c;    
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Consumes(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Path("{idC}")
    public Contact updateContact(@PathParam("idC") Integer idC, @PathParam("id") Integer idP, Contact c) { //ocia jau anotuojam paduota parametra
        c.setId(idC);
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.updateContact(em, c);
        return c;    
    }
}
   
    

