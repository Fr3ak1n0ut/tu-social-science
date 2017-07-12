import java.io.*;
import java.util.Arrays;


public class Main {
	
	
	public static void main(String[] args) {
		String path = "/Users/Felix/Documents/Startup_CSS/";
		String output = "";
		String fileName = "";
		System.out.println(args[0]);
		if(args[0].isEmpty()) {
			System.err.println("No filename was given!");
			return;
		} else {
			fileName = path + args[0];
		}
		System.out.println(fileName);
		BufferedReader br = null;
		String line = "";
		String csvSplitBy = ";";
		String test = "";
		try {
			br = new BufferedReader(new FileReader(fileName));
			while((line = br.readLine()) != null) {
				if(line.equals(" ") || line.equals("")) {
					continue;
				}
				//System.out.println(line);
				String[] data = line.split(csvSplitBy);
				for(int i = 0; i < data.length; i++) {
					test = data[i].replaceAll("[\u0000-\u001F]", "");
					
					//test = test.trim();
					test = test.replaceAll(" +", " ");
					
				}
				//line.substring(0, line.length()-1);
				if(!(test.equals("")) && !(test.equals(" "))) {
					output += "\n";
				}
				//System.out.println(Arrays.toString(data));
			}
			System.out.println(output);
			//System.out.println(output);
			try{
			    PrintWriter writer = new PrintWriter(path+"the-file-name.csv", "UTF-8");
			    writer.println(output);
			    writer.close();
			} catch (IOException e) {
			   // do something
			}
		} catch(FileNotFoundException fex) {
			System.err.println("File not found");
		} catch (IOException iex) {
			System.err.println("IO EXCEPTION");
		}
		
	
	}
}
