export namespace Alexa {

    export interface Device {
        endpointId: string;
        manufacturerName: string;
        friendlyName: string;
        description: string;
        displayCategories?: string[],
        // isReachable: boolean;
        // actions: string[];
        cookie?: Record<string, any>;   
        capabilities?: any[];
        additionalAttributes?: any
    }

    export namespace Capability {
        export enum Namespace {
            Alexa = 'Alexa',
            Networking = 'Alexa.Networking',
            Discovery = "Alexa.Discovery",
            PowerControl = "Alexa.PowerControl"
        }
        export type NamespaceType = 
            'Alexa'
            | 'Alexa.Discovery'
            | 'Alexa.PowerController'
            | 'Alexa.PowerLevelController'
            | 'Alexa.BrightnessController'
            | 'Alexa.ColorController'
            | 'Alexa.LockController'
            ;
        // export Interface[] = {
        //     TurnOff: 'TurnOff',
        //     TurnOn: 'TurnOn'
        // }
        export namespace Interface {

        }

    }


    export namespace Request {

        export interface Endpoint {
            scope: {
                type: string;
                token: string;
            };
            endpointId: string;
        }

        export interface Directive {
            header: {
                namespace: Alexa.Capability.NamespaceType;
                name: string;
                payloadVersion: string;
                messageId: string;
                correlationToken: string;
            };
            endpoint?: Endpoint;
            payload: any;
        }

        export interface Request {
            directive: Directive
        }

    }

    export namespace Response {

        export enum ErrorTypes {
            BRIDGE_UNREACHABLE = "BRIDGE_UNREACHABLE", // Indicates the target bridge endpoint is currently unreachable or offline. For example, the bridge might be turned off, disconnected from the customer's local area network, or connectivity between the bridge and the device cloud might have been lost.	When you respond to a ReportState directive, there may be times when you should return a StateReport instead of this error. See Alexa.EndpointHealth for more details.
            ENDPOINT_BUSY = "ENDPOINT_BUSY", //	Indicates the target endpoint cannot respond because it is performing another action, which may or may not have originated from a request to Alexa.	None
            ENDPOINT_LOW_POWER = "ENDPOINT_LOW_POWER", //	Indicates the directive could not be completed because the target endpoint has low batteries.	None
            ENDPOINT_UNREACHABLE = "ENDPOINT_UNREACHABLE", //	Indicates the target endpoint is currently unreachable or offline. For example, the endpoint might be turned off, disconnected from the customer's local area network, or connectivity between the endpoint and bridge or the endpoint and the device cloud might have been lost.	When you respond to a ReportState directive, there may be times when you should return a StateReport instead of this error. See Alexa.EndpointHealth for more details.
            EXPIRED_AUTHORIZATION_CREDENTIAL = "EXPIRED_AUTHORIZATION_CREDENTIAL", //Indicates that the authorization credential provided by Alexa has expired. For example, the OAuth2 access token for that customer has expired.	None
            FIRMWARE_OUT_OF_DATE = "FIRMWARE_OUT_OF_DATE", //Indicates a directive could not be handled because the firmware for a bridge or an endpoint is out of date.	None
            HARDWARE_MALFUNCTION = "HARDWARE_MALFUNCTION", //Indicates a directive could not be handled because a bridge or an endpoint has experienced a hardware malfunction.	None
            INTERNAL_ERROR = "INTERNAL_ERROR", //Indicates an error that cannot be accurately described as one of the other error types occurred while you were handling the directive. For example, a generic runtime exception occurred while handling a directive. Ideally, you will never send this error event, but instead send a more specific error type.	None
            INVALID_AUTHORIZATION_CREDENTIAL = "INVALID_AUTHORIZATION_CREDENTIAL", //Indicates that the authorization credential provided by Alexa is invalid. For example, the OAuth2 access token is not valid for the customer's device cloud account.	None
            INVALID_DIRECTIVE = "INVALID_DIRECTIVE", //Indicates a directive is not valid for this skill or is malformed.	None
            INVALID_VALUE = "INVALID_VALUE", //Indicates a directive contains an invalid value for the target endpoint. For example, use to indicate a request with an invalid heating mode, channel value or program value.	None
            NO_SUCH_ENDPOINT = "NO_SUCH_ENDPOINT", //Indicates the target endpoint does not exist or no longer exists.	None
            NOT_SUPPORTED_IN_CURRENT_MODE = "NOT_SUPPORTED_IN_CURRENT_MODE", //Indicates the target endpoint cannot be set to the specified value because of its current mode of operation.	Requires a currentDeviceMode field that indicates why the device cannot be set to a new value. Valid values are COLOR, ASLEEP, NOT_PROVISIONED, OTHER. See Alexa.ColorTemperatureControl for an example.
            RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED", //Indicates the maximum rate at which an endpoint or bridge can process directives has been exceeded.	None
            TEMPERATURE_VALUE_OUT_OF_RANGE = "TEMPERATURE_VALUE_OUT_OF_RANGE", //Indicates a directive that contains a value that outside the numeric temperature range accepted for the target thermostat. For more thermostat-specific errors, see the error section of the Alexa.ThermostatController interface. Note that the namespace for thermostat-specific errors is Alexa.ThermostatController	Optionally specify the valid range for the temperature using the validRange object. For this error type the minimum and maximum values are Temperature objects. See the TEMPERATURE_VALUE_OUT_OF_RANGE example
            VALUE_OUT_OF_RANGE = "VALUE_OUT_OF_RANGE", //Indicates a directive contains a value that is outside the numerical range accepted for the target endpoint. For example, use to respond to a request to set a percentage value over 100 percent. For temperature values, use TEMPERATURE_VALUE_OUT_OF_RANGE
        }

        export interface Header {
            namespace: string;
            name: string;
            payloadVersion: string;
            messageId: string;
            correlationToken: string;
        }

        export interface Property {
            namespace: string;
            name: string;
            value: any;
            timeOfSample: string;
            uncertaintyInMilliseconds: number;
        }

        export interface Context {
            properties: Property[];
        }

        export interface Endpoint {
            scope?: {
                type: string;
                token: string
            },
            endpointId: string;
        }

        export interface EventType {
            header: Header;
            endpoint?: Endpoint;
            payload: any;
        }

        export interface Response {
            context: Context;
            event: EventType;
        }
    }

}