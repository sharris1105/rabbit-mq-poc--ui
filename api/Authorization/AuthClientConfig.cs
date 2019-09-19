using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RabbitMqPoc.ConfigModels;

namespace RabbitMqPoc.Authorization
{
    public class AuthClientConfig : HttpClientConfig
    {
        public string AppName { get; set; }
        public string AppSecret { get; set; }

    }
}
