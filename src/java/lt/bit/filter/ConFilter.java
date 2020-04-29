
package lt.bit.filter;

import java.io.IOException;
import java.util.Enumeration;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

/**
 *
 * @author Lina
 */
@WebFilter(filterName = "ConFilter", urlPatterns = {"/*"})
public class ConFilter implements Filter {

    private EntityManagerFactory emf;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        try {  
           emf = Persistence.createEntityManagerFactory("20200421_addressBookRestPU");
           System.out.println("Loaded entity manager");
        } catch (Exception ex) {
            throw new ServletException("Failed to load JDBC driver", ex);
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException { 
EntityManager em =null;
        try{
        em = emf.createEntityManager();
        request.setAttribute("em", em);
        chain.doFilter(request, response);
        }
        catch (Exception ex) {
            throw new ServletException("Failed to create Entity Manager", ex);
        }
    }

    @Override
    public void destroy() {
        if (emf != null){
        emf.close();
        }
    }
}
