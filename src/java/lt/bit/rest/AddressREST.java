
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
import lt.bit.data.DB;
import lt.bit.data.Person;

/**
 *
 * @author Lina
 */
@Path("person/{id}/address")
public class AddressREST {

    @Context
    private HttpServletRequest request;

    @GET
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")

    public List<Address> list(@PathParam("id") Integer id) {
        EntityManager em = (EntityManager) request.getAttribute("em");
        System.out.println("Got entity manager");
        List<Address> list = DB.getAddresses(em, id);
        System.out.println("Got addresses " + list.size());
        return list;
    }

    @GET
    @Path("{addressId}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")

    public Address getAddress(@PathParam("addressId") Integer id, @PathParam("id") Integer personId) {
        EntityManager em = (EntityManager) request.getAttribute("em");

        Address address = DB.getAddress(em, id);
        System.out.println(address.getPerson().getFirstName());
        if (address.getPerson().getId() + 0 == personId + 0) {
            return address;
        } else {
            return null;
        }
    }

    @DELETE
    @Path("{addressId}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    public void deleteAddress(@PathParam("addressId") Integer id, @PathParam("id") Integer personId) { //ocia jau anotuojam paduota parametra
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.removeAddress(em, id);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Consumes(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    public Address createAddress(Address a, @PathParam("id") Integer idP) { 
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.addAddress(em, idP, a);
        return a;  
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Consumes(MediaType.APPLICATION_JSON + ";charset=UTF-8")
    @Path("{idA}")
    public Address updateAddress(@PathParam("idA") Integer idA, @PathParam("id") Integer idP, Address a) { 
        a.setId(idA);
        EntityManager em = (EntityManager) request.getAttribute("em");
        DB.updateAddress(em, a);
        return a;     
    }
}
