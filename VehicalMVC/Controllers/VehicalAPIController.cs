using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VehicalMVC.Models;

namespace VehicalMVC.Controllers
{
    public class VehicalAPIController : ApiController
    {
        private vehicaldbEntities db = new vehicaldbEntities();

        // GET api/VehicalAPI
        public IEnumerable<Vehical> GetVehicals()
        {
            return db.Vehicals.AsEnumerable();
        }

        // GET api/VehicalAPI/5
        public Vehical GetVehical(int id)
        {
            Vehical vehical = db.Vehicals.Single(v => v.VehicalID == id);
            if (vehical == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return vehical;
        }

        // PUT api/VehicalAPI/5
        public HttpResponseMessage PutVehical(int id, Vehical vehical)
        {
            if (ModelState.IsValid && id == vehical.VehicalID)
            {
                db.Vehicals.Attach(vehical);
                db.ObjectStateManager.ChangeObjectState(vehical, System.Data.EntityState.Modified);

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/VehicalAPI
        public HttpResponseMessage PostVehical(Vehical vehical)
        {
            if (ModelState.IsValid)
            {
                db.Vehicals.AddObject(vehical);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, vehical);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = vehical.VehicalID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/VehicalAPI/5
        public HttpResponseMessage DeleteVehical(int id)
        {
            Vehical vehical = db.Vehicals.Single(v => v.VehicalID == id);
            if (vehical == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Vehicals.DeleteObject(vehical);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, vehical);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}