package receitas;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

public class receitaDAO {
	public void inserir (receitaDTO ext) {
		Conexao con = new Conexao();
		int idGerado = 0;
		try {
			String sql = "INSERT INTO receitas (titulo, descricao, autor, data, ingredientes, preparo) VALUES (?, ?, ?, ?, ?, ?)";
			//System.out.println("SQL INSERT -----------  "+sql);
			PreparedStatement prep = con.getConnection().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			prep.setString(1, ext.getTitulo());
			prep.setString(2, ext.getDescricao());
			prep.setString(3, ext.getAutor());
			prep.setString(4, ext.getData());
			prep.setString(5, ext.getIngredientes());
			prep.setString(6, ext.getPreparo());
			int rowsAffected = prep.executeUpdate();

		    if (rowsAffected > 0) {
		        try (ResultSet generatedKeys = prep.getGeneratedKeys()) {
		            if (generatedKeys.next()) {
		                idGerado = generatedKeys.getInt(1);
		                //System.out.println("ID GERADO: "+idGerado);
		            } else {
		                System.err.println("Falha ao obter o ID gerado.");
		            }
		        }
                sql = "INSERT INTO receita_usuario (idreceita_fk, idusuario_fk) VALUES (?, ?)";
                PreparedStatement pst = con.getConnection().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
    			pst = con.getConnection().prepareStatement(sql);
    			pst.setInt(1, idGerado);
    			pst.setInt(2, ext.getIdusuario());
    			rowsAffected = pst.executeUpdate();
		    } else {
		        System.err.println("Nenhum registro inserido.");
		    }
		} catch (Exception e) {
			e.printStackTrace();

		}
	}
	
	public void alterar (receitaDTO ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "UPDATE receitas SET autor = ?, titulo = ?, descricao = ?, data = ?, ingredientes = ?, preparo = ? WHERE idreceita = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setString(1, ext.getAutor());
			prep.setString(2, ext.getTitulo());
			prep.setString(3, ext.getDescricao());
			prep.setString(4, ext.getData());
			prep.setString(5, ext.getIngredientes());
			prep.setString(6, ext.getPreparo());
			prep.setInt(7, ext.getIdreceita());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void excluir (receitaDTO ext) {
		Conexao con = new Conexao();
		
		try {
			System.out.println("DELETANDO RECEITA_USUARIO ----------------------");
			
			String sql = "DELETE FROM receita_usuario WHERE idreceita_fk = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setInt(1, ext.getIdreceita());
			prep.execute();
			
			sql = "DELETE FROM receitas WHERE idreceita = ?";
			prep = con.getConnection().prepareStatement(sql);
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
				ext.setTitulo(res.getString("titulo"));
				ext.setDescricao(res.getString("descricao"));
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
	
	public List<receitaDTO> consultarReceitas (String id) {
		List<receitaDTO> lista = new LinkedList<receitaDTO>();
		Conexao con = new Conexao();
		try {
			String sql = "SELECT * FROM receitas as r INNER JOIN receita_usuario as ru on ru.idreceita_fk = "
					+ "r.idreceita WHERE ru.idusuario_fk = " + id + " ORDER BY data";
			System.out.println("SQL CONSULTA POR USUARIO: "+sql);
			
			Statement sta = con.getConnection().createStatement();
			ResultSet res = sta.executeQuery(sql);
			while (res.next()) {
				receitaDTO ext = new receitaDTO();
				ext.setTitulo(res.getString("titulo"));
				ext.setDescricao(res.getString("descricao"));
				ext.setAutor(res.getString("autor"));
				ext.setIngredientes(res.getString("ingredientes"));
				ext.setData(res.getString("data"));
				ext.setPreparo(res.getString("preparo"));
				ext.setIdreceita(res.getInt("idreceita"));
				lista.add(ext);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return lista;
	}
	
	public List<receitaDTO> listar() {
		List<receitaDTO> lista = new LinkedList<receitaDTO>();
		Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM receitas ORDER BY data";
			System.out.println("SQL [ GET ] - " + sql);
			Statement instrucao = con.getConnection().createStatement();
			ResultSet resultSet = instrucao.executeQuery(sql);

			while (resultSet.next()) {
				receitaDTO ext = new receitaDTO();
				ext.setIdreceita(resultSet.getInt("idreceita"));
				ext.setTitulo(resultSet.getString("titulo"));
				ext.setDescricao(resultSet.getString("descricao"));
				ext.setAutor(resultSet.getString("autor"));
				ext.setData(resultSet.getString("data"));
				ext.setIngredientes(resultSet.getString("ingredientes"));
				ext.setPreparo(resultSet.getString("preparo"));
				lista.add(ext);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return lista;
	}
}