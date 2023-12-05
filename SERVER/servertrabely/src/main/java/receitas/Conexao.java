package receitas;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class Conexao {
	private Connection connection;
	
	public Conexao () {
		try {
//			String url = "jdbc:mariadb://localhost:8081/ativprojectweb2023";
//			String user = "root";
//			String senha = "270590";
//			
//			Class.forName("org.mariadb.jdbc.Driver");
			
			
			String url = "jdbc:postgresql://localhost:5432/culinaria?user=postgres";
			System.out.println(url);	
			String user = "postgres";
			String senha = "123";
			Properties info = new Properties();
			info.put("user", user);
			info.put("password", senha);
			Class.forName("org.postgresql.Driver");
			
			this.connection = DriverManager.getConnection(url);
			System.out.println("Conexão realizada com sucesso!");
			
		} catch (Exception e) {
			System.out.println("Conexão não estabelecida");
			//System.out.println(e.getMessage());
			System.out.println("------------------------------------------------------------------------------");
		}
	}
	
	public void desconectar() {
		try {
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Connection getConnection() {
		return connection;
	}

	public void setConnection(Connection connection) {
		this.connection = connection;
	}
}