package receitas;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;



/**
 * Servlet implementation class Extrato
 */
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; chçarset=UTF-8");
		response.setHeader("Cache-control", "no-cache, no-store");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "-1");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "*");
		response.setHeader("Access-Control-Allow-Headers", "*");
		response.setHeader("Access-Control-Max-Age", "0");
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Content-Type", "application/json; charset=UTF-8");
		response.setContentType("application/json");
		
		String usuario = request.getParameter("usuario");
        String senha = request.getParameter("senha");
                
		PrintWriter out = response.getWriter();
		loginDAO extDao = new loginDAO();
		
		loginDTO lista = extDao.consultar(usuario,senha);
		Gson gson = new Gson();
		out.println(gson.toJson(lista));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; chçarset=UTF-8");
		response.setHeader("Cache-control", "no-cache, no-store");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "-1");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "*");
		response.setHeader("Access-Control-Allow-Headers", "*");
		response.setHeader("Access-Control-Max-Age", "0");
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Content-Type", "application/json; charset=UTF-8");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		//out.println("Executando método POST");
		try {
			StringBuilder sb = new StringBuilder();
			BufferedReader reader = request.getReader();
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
			String body = sb.toString();
			
			Gson gson = new Gson();
			loginDTO ext  = gson.fromJson(body, loginDTO.class);
			
			loginDAO extDao = new loginDAO();
			extDao.inserir(ext);
			
			retorno r = new retorno(true, "Registro inserido com sucesso.");
			System.out.println(gson.toJson(r));
		} catch (Exception e) {
			retorno r = new retorno(false, e.getMessage());
			Gson gson = new Gson();
			System.out.println(gson.toJson(r));
			e.printStackTrace();
			out.print(r);
		}
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; chçarset=UTF-8");
		response.setHeader("Cache-control", "no-cache, no-store");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "-1");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "*");
		response.setHeader("Access-Control-Allow-Headers", "*");
		response.setHeader("Access-Control-Max-Age", "0");
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Content-Type", "application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		//out.println("Executando método PUT");
		try {
			StringBuilder sb = new StringBuilder();
			BufferedReader reader = request.getReader();
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
			String body = sb.toString();
			
			Gson gson = new Gson();
			loginDTO ext  = gson.fromJson(body, loginDTO.class);
			
			loginDAO extDao = new loginDAO();
			extDao.alterar(ext);
			retorno r = new retorno(true, "Registro alterado com sucesso.");
			System.out.println(gson.toJson(r));
		} catch (Exception e) {
			retorno r = new retorno(false, e.getMessage());
			Gson gson = new Gson();
			System.out.println(gson.toJson(r));
			e.printStackTrace();
			out.print(r);
		}
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; chçarset=UTF-8");
		response.setHeader("Cache-control", "no-cache, no-store");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "-1");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "*");
		response.setHeader("Access-Control-Allow-Headers", "*");
		response.setHeader("Access-Control-Max-Age", "0");
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Content-Type", "application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		//out.println("Executando método DELETE");
		try {
			String id = request.getRequestURI();
			id = id.substring(id.lastIndexOf("/")+1);
			
			loginDAO extDao = new loginDAO();
			loginDTO ext= new loginDTO();
			ext.setIdlogin(Integer.parseInt(id));
			extDao.excluir(ext);
			Gson gson = new Gson();
			retorno r = new retorno(true, "Registro excluido com sucesso.");
			System.out.println(gson.toJson(r));
		} catch (Exception e) {
			retorno r = new retorno(false, e.getMessage());
			Gson gson = new Gson();
			System.out.println(gson.toJson(r));
			e.printStackTrace();
			out.print(r);
		}
	}
}