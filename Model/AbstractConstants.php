<?php

namespace Ekyna\Bundle\CoreBundle\Model;

/**
 * Class AbstractConstants
 * @package Ekyna\Bundle\CoreBundle\Model
 * @author Étienne Dauvergne <contact@ekyna.com>
 */
abstract class AbstractConstants implements ConstantsInterface
{
    /**
     * @var array
     */
    protected static $choices;


    /**
     * Returns the constant choices.
     *
     * @return array
     */
    public static function getChoices()
    {
        if (null === static::$choices) {
            static::$choices = [];
            foreach (static::getConfig() as $constant => $config) {
                static::$choices[$constant] = $config[0];
            }
        }

        return static::$choices;
    }

    /**
     * Returns the label for the given constant.
     *
     * @param mixed $constant
     * @return string
     */
    public static function getLabel($constant)
    {
        static::isValid($constant, true);

        return static::getChoices()[$constant];
    }

    /**
     * Returns whether the constant is valid or not.
     *
     * @param mixed   $constant
     * @param boolean $throwException
     *
     * @return bool
     */
    public static function isValid($constant, $throwException = false)
    {
        if (array_key_exists($constant, static::getConfig())) {
            return true;
        }

        if ($throwException) {
            throw new \InvalidArgumentException(sprintf('Unknown constant "%s"', $constant));
        }

        return false;
    }
}
