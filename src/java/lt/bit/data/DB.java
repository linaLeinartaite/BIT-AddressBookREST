
package lt.bit.data;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

/**
 *
 * @author Lina
 */
public class DB {
    public static List<Person> getPersons(EntityManager em) {
        Query q = em.createQuery("select p from Person p order by p.firstName"); 
        List<Person> l = q.getResultList();
        return l;
    }

    public static List<Address> getAddresses(EntityManager em, Integer idP) {
        if (idP != null) {
            Query q = em.createQuery("select p.addresses from Person p where p.id =" + idP);
            List<Address> a = q.getResultList();
            return a ;
        }
        return new ArrayList <>(); 
    }

    public static List<Contact> getContacts(EntityManager em, Integer idP) {
        if (idP != null) {
            Query q = em.createQuery("select p.contacts from Person p where p.id =" + idP);
            List<Contact> c = q.getResultList();
            return c;
        }
        return new ArrayList <>();
    }

    public static Person getPerson(EntityManager em, Integer id) {
        if (id != null) {
            return em.find(Person.class, id);
        }
        return null;
    }

    public static Address getAddress(EntityManager em, Integer id) {
        if (id != null) {
            return em.find(Address.class, id);
        }
        return null;
    }

    public static Contact getContact(EntityManager em, Integer id) {
        if (id != null) {
            return em.find(Contact.class, id);
        }
        return null;
    }

    public static void addPerson(EntityManager em, Person p) {
        p.setId(null); 
        if (p.getBirthDate() != null) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(p.getBirthDate());
            cal.set(Calendar.HOUR, 12);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            cal.set(Calendar.MILLISECOND, 0);
            p.setBirthDate(cal.getTime());
        }     
            EntityTransaction tx = em.getTransaction();
            tx.begin();
            em.persist(p); 
            em.flush();
            tx.commit();
    }

    public static void addAddress(EntityManager em, Integer idP, Address a) {

        if (idP != null && a != null) {
            a.setId(null);
            Person p = em.find(Person.class, idP);
            a.setPerson(p);
            EntityTransaction tx = em.getTransaction();
            tx.begin();
            em.persist(a);
            em.flush();
            tx.commit();
        }
    }

    public static void addContact(EntityManager em, Integer idP, Contact c) {
        if (idP != null && c != null) {
            c.setId(null);
            Person p = em.find(Person.class, idP);
            c.setPerson(p);
                EntityTransaction tx = em.getTransaction();
                tx.begin();
                em.persist(c);
                em.flush();
                tx.commit();
        }
    }

    public static void removePerson(EntityManager em, Integer id) {
        if (id != null) {
            EntityTransaction tx = em.getTransaction();
            tx.begin();
            Person p = em.find(Person.class, id);
            if (p != null) {
                em.remove(p);
                em.flush(); 
            }
            tx.commit();

        }

    }

    public static void removeAddress(EntityManager em, Integer idA) {
        if (idA != null) {
            EntityTransaction tx = em.getTransaction();
            tx.begin();
            Address a = em.find(Address.class, idA);
            if (a != null) {
                em.remove(a);
                em.flush(); 
            }
            tx.commit();
        }
    }

    public static void removeContact(EntityManager em, Integer idC) {
        if (idC != null) {
            EntityTransaction tx = em.getTransaction();
            tx.begin();
            Contact c = em.find(Contact.class, idC);
            if (c != null) {
                em.remove(c);
                em.flush();
            }
            tx.commit();
        }
    }

    public static void updatePerson(EntityManager em, Person up) {
        if (up != null) {
            if (up.getBirthDate() != null) {
                Calendar cal = Calendar.getInstance();
                cal.setTime(up.getBirthDate());
                cal.set(Calendar.HOUR, 12);
                cal.set(Calendar.MINUTE, 0);
                cal.set(Calendar.SECOND, 0);
                cal.set(Calendar.MILLISECOND, 0);
                up.setBirthDate(cal.getTime());
            }
            if (up.getId() != null) {
                EntityTransaction tx = em.getTransaction();
                tx.begin();
                Person p = em.find(Person.class,
                        up.getId());
                if (p != null) {
                        p.setFirstName(up.getFirstName());
                        p.setLastName(up.getLastName());

                    p.setBirthDate(up.getBirthDate());
                    p.setSalary(up.getSalary());
                    em.persist(p); 
                    em.flush();
                }
                tx.commit();

            }
        }
    }

    public static void updateAddress(EntityManager em, Address na) {
        if (na == null || na.getId() == null) {
            return;
        }
        Address a = getAddress(em, na.getId());
        if (a == null) {
            return;
        }
        EntityTransaction tx = em.getTransaction();
        tx.begin();     
            a.setAddress(na.getAddress());
            a.setCity(na.getCity());
            a.setPostCode(na.getPostCode());
        em.persist(a); 
        em.flush();
        tx.commit();
    }

    public static void updateContact(EntityManager em, Contact ca) {
        if (ca == null || ca.getId() == null) {
            return;
        }
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        Contact c = getContact(em, ca.getId());
        if (c == null) {
            return;
        }       
            c.setContact(ca.getContact());
            c.setType(ca.getType());
        em.persist(c); 
        tx.commit();
    }
}
