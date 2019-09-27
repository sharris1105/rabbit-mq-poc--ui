using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RabbitMqPoc.Dtos;
using RabbitMqPoc.Services;

namespace RabbitMqPoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventMessageQueueController : ControllerBase
    {
        [HttpGet("[action]")]
        public async Task<IActionResult> LatestEventMessage()
        {
            var queueProcessor = new LiveUpdateService() { Enabled = true };
            queueProcessor.SetupConnection();
            var message = queueProcessor.Consume();

            return Ok(message);
        }
    }
}
