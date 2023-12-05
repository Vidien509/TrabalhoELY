package receitas;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

public class receitaDAO {
	public void inserir (receitaDTO ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "INSERT INTO receitas (autor, data, ingredientes, preparo) VALUES (?, ?, ?, ?)";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setString(1, ext.getAutor());
			prep.setString(2, ext.getData());
			prep.setString(3, ext.getIngredientes());
			prep.setString(4, ext.getPreparo());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void alterar (receitaDTO ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "UPDATE receitas SET autor = ?, data = ?, ingredientes = ?, preparo = ? WHERE idreceita = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setString(1, ext.getAutor());
			prep.setString(2, ext.getData());
			prep.setString(3, ext.getIngredientes());
			prep.setString(4, ext.getPreparo());
			prep.setInt(5, ext.getIdreceita());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void excluir (receitaDTO ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "DELETE FROM receitas WHERE idreceita = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setInt(1, ext.getIdreceita());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public receitaDTO consultar (int id) {
		receitaDTO ext = new receitaDTO();
		Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM receitas WHERE idreceita = " + id;
			Statement sta = con.getConnection().createStatement();
			ResultSet res = sta.executeQuery(sql);
			if (res.next()) {
				ext.setAutor(res.getString("autor"));
				ext.setIngredientes(res.getString("ingredientes"));
				ext.setData(res.getString("data"));
				ext.setPreparo(res.getString("preparo"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return ext;
	}
	
	public List<receitaDTO> listar() {
		List<receitaDTO> lista = new LinkedList<receitaDTO>();
		Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM receitas ORDER BY idreceita";
			System.out.println("SQL [ GET ] - " + sql);
			Statement instrucao = con.getConnection().createStatement();
			ResultSet resultSet = instrucao.executeQuery(sql);

			if (resultSet.next()) {
				receitaDTO ext = new receitaDTO();
				ext.setIdreceita(resultSet.getInt("idreceita"));
				ext.setAutor(resultSet.getString("autor"));
				ext.setData(resultSet.getString("data"));
				ext.setIngredientes(resultSet.getString("ingredientes"));
				ext.setPreparo(resultSet.getString("preparo"));
				System.out.println(ext);
				lista.add(ext);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return lista;
	}
}