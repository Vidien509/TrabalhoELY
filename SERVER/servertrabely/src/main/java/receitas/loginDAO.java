package receitas;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

public class loginDAO {
	public void inserir (loginDTO ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
			//System.out.println("SQL INSERT -----------  "+sql);
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setString(1, ext.getUsuario());
			prep.setString(2, ext.getEmail());
			prep.setString(3, ext.getSenha());
			System.out.println("SQL INSERT -----------  "+prep);
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void alterar (loginDTO ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "UPDATE usuarios SET nome = ?, email = ? WHERE idusuario = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setString(1, ext.getUsuario());
			prep.setString(2, ext.getEmail());
			prep.setInt(3, ext.getIdlogin());

			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void excluir (loginDTO ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "DELETE FROM usuarios WHERE idusuario = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setInt(1, ext.getIdlogin());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public loginDTO consultar (String usuario, String senha) {
		loginDTO ext = new loginDTO();
		Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM usuarios WHERE nome = '" +usuario+ "' AND senha = '"+ senha+"'";
			System.out.println("SQL CONSULTA - "+sql);
			Statement sta = con.getConnection().createStatement();
			ResultSet res = sta.executeQuery(sql);
			if (res.next()) {
				ext.setUsuario(res.getString("nome"));
				ext.setEmail(res.getString("email"));
				ext.setSenha(res.getString("senha"));
				ext.setIdlogin(res.getInt("idusuario"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return ext;
	}
	
	public List<loginDTO> listar() {
		List<loginDTO> lista = new LinkedList<loginDTO>();
		Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM usuarios ORDER BY idusuario";
			System.out.println("SQL [ GET ] - " + sql);
			Statement instrucao = con.getConnection().createStatement();
			ResultSet resultSet = instrucao.executeQuery(sql);

			while (resultSet.next()) {
				loginDTO ext = new loginDTO();
				ext.setIdlogin(resultSet.getInt("idusuario"));
				ext.setUsuario(resultSet.getString("nome"));
				ext.setEmail(resultSet.getString("email"));
				ext.setSenha(resultSet.getString("senha"));

				lista.add(ext);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return lista;
	}
}