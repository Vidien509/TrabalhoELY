package receitas;

public class receitaDTO {

	private String autor;
	private String data;
	private String ingredientes;
	private String preparo;
	
	private Integer idreceita;
	
	
	public Integer getIdreceita() {
		return idreceita;
	}
	public void setIdreceita(Integer idreceita) {
		this.idreceita = idreceita;
	}
	public String getAutor() {
		return autor;
	}
	public void setAutor(String autor) {
		this.autor = autor;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getIngredientes() {
		return ingredientes;
	}
	public void setIngredientes(String ingredientes) {
		this.ingredientes = ingredientes;
	}
	public String getPreparo() {
		return preparo;
	}
	public void setPreparo(String preparo) {
		this.preparo = preparo;
	}
	
}