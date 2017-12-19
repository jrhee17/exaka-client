/**
 * Created by john on 28/05/2017.
 */
export class BlockFlag {
  public name: string;
  public description: string;
  public code: string;
  public additional_text: string;

  public block_id: string;

  constructor(name: string = null, description: string = null, code: string = null, additional_text: string = '') {
    this.name = name;
    this.description = description;
    this.code = code;
    this.additional_text = additional_text;
  }
}
