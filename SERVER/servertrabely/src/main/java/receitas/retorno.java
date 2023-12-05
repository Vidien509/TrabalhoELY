package receitas;

public class retorno {

	private boolean sucess;
	private String mensagem;
	
	public retorno(boolean sucess, String mensagem) {
		// TODO Auto-generated constructor stub
		this.sucess = sucess;
		this.mensagem = mensagem;
	}

	public boolean isSucess() {
		return sucess;
	}

	public void setSucess(boolean sucess) {
		this.sucess = sucess;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}

}
