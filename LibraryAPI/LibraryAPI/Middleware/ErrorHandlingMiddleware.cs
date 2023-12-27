using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using LibraryAPI;
using System.Net;
using System.Text.Json;

namespace LibraryAPI
{
    public class ErrorHandlingMiddleware 
    {
       
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        private ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (SomeException someException)
            {
                _logger.LogError(someException.Message);
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Something went wrong");
              
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Something went wrong");


            }
        }
    }

}
