using System.Net;
using System.Threading.Tasks;
using RabbitMqPoc.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace RabbitMqPoc.Controllers
{

    [Route("api/[controller]")]
    public class AppAuthController : Controller
    {
        private readonly IAppAuthApiService _appAuthApiService;
        private readonly ILogger<AppAuthController> _logger;

        public AppAuthController(IAppAuthApiService appAuthApiService, ILogger<AppAuthController> logger)
        {
            _appAuthApiService = appAuthApiService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("getsession")]
        public async Task<IActionResult> GetSession([FromBody]TransferPayloadModel payload)
        {
            var response = await _appAuthApiService.GetSession(payload.SessionId).ConfigureAwait(false);

            if (response.ResponseStatusCode == 200)
            {
                return Ok(response);
            }
           
            return StatusCode(response.ResponseStatusCode, response.ResponseMessage);
        }

        [AllowAnonymous]
        [HttpPost("validateandissue")]
        public async Task<IActionResult> ValidateAndIssueToken([FromBody]TokenValidationModel tokenValidationModel)
        {
            var response = await _appAuthApiService.ValidateAndIssueToken(tokenValidationModel.InboundToken).ConfigureAwait(false);

            if (response.ResponseStatusCode == (int)HttpStatusCode.OK)
            {
                return Ok(response);
            }

            var errorResponse = new AppAuthTokenModel()
            {
                Token = string.Empty,
                Payload = string.Empty,
                ResponseMessage = response.ResponseMessage,
                ResponseStatusCode = response.ResponseStatusCode
            };

            return BadRequest(errorResponse);
        }
    }
}