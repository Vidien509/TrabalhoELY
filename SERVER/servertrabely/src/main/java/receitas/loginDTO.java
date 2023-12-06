package receitas;

public class loginDTO {

	
	private String usuario;
	private String senha;
	private String email;

	private Integer idusuario;

	
	public Integer getIdlogin() {
		return idusuario;
	}

	public void setIdlogin(Integer idlogin) {
		this.idusuario = idlogin;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
	
}
