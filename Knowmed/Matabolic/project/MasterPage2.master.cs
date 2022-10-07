using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MasterPage2 : System.Web.UI.MasterPage
{
	protected void Page_Load(object sender, EventArgs e)
	{
    }
	public void linkLogout_Click(object sender, EventArgs e)
	{
		this.Session.Clear();
		this.Session.Abandon();
		this.Response.Redirect("../../index.html");
	}
}
